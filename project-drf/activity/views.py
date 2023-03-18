from django.http import HttpResponse
from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivityModelSerializer
from utils.pagination import StandardPageNumberPagination
import sys, os
from utils.excel import *

class ActivityListAPIView(APIView):
    queryset = Activity.objects.all()  # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = ActivityModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器
    
    def get(self, request, *args, **kwargs):
        """
        查询所有活动信息
        """
        response = {'success': True}
        activity_list = Activity.objects.all()
        paging_status = request.GET.get("pagingStatus")
        for activity_item in activity_list:
            apply_activity = Activity.objects.get(id=activity_item.id)
            apply_person_num = apply_activity.apply_set.all().count()
            pass_person_num = apply_activity.apply_set.filter(apply_status=1).count()
            Activity.objects.filter(id=activity_item.id).update(
                apply_person_num=apply_person_num, pass_person_num=pass_person_num)
        total = activity_list.count()
        activity_serializers = ActivityModelSerializer(activity_list, many=True, context={'request': request})
        pagination = StandardPageNumberPagination()
        pg_data = pagination.paginate_queryset(queryset=activity_serializers.data, request=request, view=self)
        if paging_status == 'false':
            response['data'] = activity_serializers.data
        else:
            response['data'] = pg_data
        response['total'] = total
        return Response(response)

    @swagger_auto_schema(
        operation_summary="创建活动", request_body=ActivityModelSerializer
    )
    def post(self, request):
        """
        新增一条活动信息
        """
        data = request.data
        serializer = ActivityModelSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'success': True,
            'data': {
                'message': '创建成功！'
            }
        })
    
    def delete(self, request, *args, **kwargs):
        """
        批量删除
        """
        delete_id = request.query_params.get('deleteId', None)
        if not delete_id:
            return Response({'message': '数据不存在！'})
        for i in delete_id.split(','):
            get_object_or_404(Activity, pk=int(i)).delete()
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)
    
    
class ActivityDetailAPIView(APIView):
    def get(self, request, pk):
        """
        根据id查询单个活动信息
        """
        # 查询pk指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
            apply_person_num = activity.apply_set.all().count()
            pass_person_num = activity.apply_set.filter(apply_status=1).count()
            Activity.objects.filter(id=activity.id).update(apply_person_num=apply_person_num, pass_person_num=pass_person_num)
            
        except Activity.DoesNotExist:
            return Response({'success': True, 'data': {'message': '数据不存在！'}})
        # 创建序列化器进行序列化
        serializer = ActivityModelSerializer(instance=activity)
        # 响应
        response = {
            'success': True,
            'data': serializer.data,
        }
        return Response(response)
    
    def put(self, request, pk):
        """
        根据id修改指定活动信息
        """

        # 根据pk所指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return Response({'message': '数据不存在！'})
        # 获取前端传入的请求体数据
        # 创建序列化器进行反序列化操作
        serializer = ActivityModelSerializer(instance=activity, data=request.data, partial=True)
    
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
        根据id删除指定活动信息
        """

        # 查询pk所指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return Response({'message': '数据不存在！'})
    
        activity.delete()
    
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)
 
    
class ActivityExportExcelAPIView(APIView):
    
    def post(self, request):
        """
        将数据转存为excel
        """
        
        activity_codes = request.data.get("activity_code")
        n = len(activity_codes)

        # 表头字段
        head_data = [u'活动编号', u'活动名称', u'活动描述', u'发布企业', u'活动地点', u'开始日期', u'开始时间', u'志愿者素养要求', u'需要人数', u'已报名人数',
                     u'审核通过人数', u'创建时间']
        # 查询记录数据
        records = []
        for activity_code in activity_codes:
            if activity_code != "":
                activity_obj = Activity.objects.get(id=activity_code)
                id = activity_obj.id
                name = activity_obj.name
                desc = activity_obj.desc
                publish_company_name = activity_obj.publish_company_name
                address = activity_obj.address
                start_date = activity_obj.start_date.strftime("%Y-%m-%d")
                start_time = activity_obj.start_time.strftime("%H:%M:%S")
                demand = activity_obj.demand
                need_person_num = activity_obj.need_person_num
                apply_person_num = activity_obj.apply_person_num
                pass_person_num = activity_obj.pass_person_num
                create_time = activity_obj.create_time.strftime("%Y-%m-%d %H:%M:%S")
              
            
                record = []
                record.append(id)
                record.append(name)
                record.append(desc)
                record.append(publish_company_name)
                record.append(address)
                record.append(str(start_date))
                record.append(str(start_time))
                record.append(demand)
                record.append(need_person_num)
                record.append(apply_person_num)
                record.append(pass_person_num)
                record.append(str(create_time))
              
            records.append(record)

        # 获取当前路径
        cur_path = os.path.abspath('.')
        # 设置生成文件所在路径
        download_url = cur_path + '\\upload\\'

        # 写入数据到excel中
        ret = write_to_excel(n, head_data, records, download_url)
    
        return HttpResponse(ret)

