from django.http import HttpResponse
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView

from activity.models import Activity
from .models import Apply  # 导入对应的模型类
from rest_framework.response import Response
from .serializers import ApplyModelSerializer  # 导入对应的序列化器
from utils.pagination import StandardPageNumberPagination
import sys, os
from utils.excel import *

class ApplyListAPIView(APIView):
    queryset = Apply.objects.all()  # 指明查询集
    serializer_class = ApplyModelSerializer  # 指明所使用的序列化器
    
    def get(self, request, *args):
        """
        查询所有报名信息
        """
        response = {'success': True}
        kwargs = {}
        # 根据姓名查询
        if request.GET.get("name", ""):
            kwargs.update({
                "name__contains": request.GET.get("name")
            })
        # 根据地址查询
        if request.GET.get("address", ""):
            kwargs.update({
                "address__contains": request.GET.get("address")
            })
        apply_list = Apply.objects.filter(**kwargs)
        total = apply_list.count()
        apply_serializers = ApplyModelSerializer(apply_list, many=True, context={'request': request})
        pagination = StandardPageNumberPagination()
        pg_data = pagination.paginate_queryset(queryset=apply_serializers.data, request=request, view=self)
        response['data'] = pg_data
        response['total'] = total
        return Response(response)

    def post(self, request):
        """
        新增一条报名信息
        """

        # 获取前端传入请求体数据
        data = request.data
        # 创建序列化器进行反序列化操作
        serializer = ApplyModelSerializer(data=data)
        # 调用序列化器的is_valid方法进行校验
        serializer.is_valid(raise_exception=True)
        # 调用序列化器的save方法进行执行create方法
        serializer.save()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '报名成功！'
                
            }
        }
        return Response(response)
    
    def delete(self, request, *args, **kwargs):
        """
        批量删除
        """
        delete_id = request.query_params.get('deleteId', None)
        if not delete_id:
            return Response({'message': '数据不存在！'})
        for i in delete_id.split(','):
            get_object_or_404(Apply, pk=int(i)).delete()
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)
    
    
class ApplyDetailAPIView(APIView):

    def get(self, request, pk):
        """
        根据id查询指定报名信息
        """

        # 查询pk指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'success': True, 'data': {'message': '数据不存在！'}})
        # 创建序列化器进行序列化
        serializer = ApplyModelSerializer(instance=apply)
        # 响应
        response = {
            'success': True,
            'data': serializer.data,
        }
        return Response(response)

    def put(self, request, pk):
        """
        根据id修改指定报名信息
        """
        # 根据pk所指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'message': '数据不存在！'})
        # 获取前端传入的请求体数据
        # 创建序列化器进行反序列化操作
        serializer = ApplyModelSerializer(instance=apply, data=request.data, partial=True)

        # 校验
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '更新成功'
            },
        }
        return Response(response)

    def delete(self, request, pk):
        """
        根据id删除指定报名信息
        """
        # 查询pk所指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'message': '数据不存在！'})
        apply.delete()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)


class ApplyExportExcelAPIView(APIView):
    
    def post(self, request):
        """
        批量导出报名信息表
        """

        apply_codes = request.data.get("apply_code")
        n = len(apply_codes)
        
        # 表头字段
        head_data = [u'报名编号', u'姓名', u'年龄', u'性别', u'地址', u'电话', u'报名活动', u'报名状态', u'申请时间']
        # 查询记录数据
        records = []
        for apply_code in apply_codes:
            if apply_code != "":
                apply_obj = Apply.objects.get(id=apply_code)
                id = apply_obj.id
                name = apply_obj.name
                age = apply_obj.age
                sex = '未知' if apply_obj.sex == 0 else '男' if apply_obj.sex == 1 else '女'
                address = apply_obj.address
                tel = apply_obj.tel
                apply_status = '待审核' if apply_obj.apply_status else '已审核' if apply_obj.apply_status == 1 else '未通过'
                apply_time = apply_obj.apply_time.strftime("%Y-%m-%d %H:%M:%S")
                
                belonging_activity_id = apply_obj.belonging_activity_id
                apply_activity = Activity.objects.get(id=belonging_activity_id).name
                
                record = []
                record.append(id)
                record.append(name)
                record.append(age)
                record.append(sex)
                record.append(address)
                record.append(tel)
                record.append(apply_activity)
                record.append(apply_status)
                record.append(str(apply_time))
                
            records.append(record)
        
        # 获取当前路径
        cur_path = os.path.abspath('.')
        # 设置生成文件所在路径
        download_url = cur_path + '\\upload\\'
        
        # 写入数据到excel中
        ret = write_to_excel(n, head_data, records, download_url)
        
        return HttpResponse(ret)

    def get(self, request):
        """
        默认导出报名信息表
        """
    
        applys = Apply.objects.all()
        n = len(applys)
    
        # 表头字段
        head_data = [u'报名编号', u'姓名', u'年龄', u'性别', u'地址', u'电话', u'报名活动', u'报名状态', u'申请时间']
        # 查询记录数据
        records = []
        for apply_obj in applys:
          
            id = apply_obj.id
            name = apply_obj.name
            age = apply_obj.age
            sex = '未知' if apply_obj.sex == 0 else '男' if apply_obj.sex == 1 else '女'
            address = apply_obj.address
            tel = apply_obj.tel
            apply_status = '待审核' if apply_obj.apply_status else '已审核' if apply_obj.apply_status == 1 else '未通过'
            apply_time = apply_obj.apply_time.strftime("%Y-%m-%d %H:%M:%S")
            
            belonging_activity_id = apply_obj.belonging_activity_id
            apply_activity = Activity.objects.get(id=belonging_activity_id).name
        
            record = []
            record.append(id)
            record.append(name)
            record.append(age)
            record.append(sex)
            record.append(address)
            record.append(tel)
            record.append(apply_activity)
            record.append(apply_status)
            record.append(str(apply_time))
        
            records.append(record)
    
        # 获取当前路径
        cur_path = os.path.abspath('.')
        # 设置生成文件所在路径
        download_url = cur_path + '\\upload\\'
    
        # 写入数据到excel中
        ret = write_to_excel(n, head_data, records, download_url)
    
        return HttpResponse(ret)

