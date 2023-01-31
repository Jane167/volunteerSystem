from rest_framework.schemas import SchemaGenerator
from rest_framework.schemas.generators import LinkNode, insert_into
from rest_framework.renderers import *
from rest_framework_swagger import renderers
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAuthenticatedOrReadOnly
from django.http import JsonResponse


class MySchemaGenerator(SchemaGenerator):

    def get_links(self, request=None):
        links = LinkNode()

        paths = []
        view_endpoints = []
        for path, method, callback in self.endpoints:
            view = self.create_view(callback, method, request)
            path = self.coerce_path(path, method, view)
            paths.append(path)
            view_endpoints.append((path, method, view))

        # Only generate the path prefix for paths that will be included
        if not paths:
            return None
        prefix = self.determine_path_prefix(paths)

        for path, method, view in view_endpoints:
            if not self.has_view_permissions(path, method, view):
                continue
            link = view.schema.get_link(path, method, base_url=self.url)
            # 添加下面这一行方便在views编写过程中自定义参数.
            link._fields += self.get_core_fields(view)

            subpath = path[len(prefix):]
            keys = self.get_keys(subpath, method, view)

            # from rest_framework.schemas.generators import LinkNode, insert_into
            insert_into(links, keys, link)

        return links

    # 从类中取出我们自定义的参数, 交给swagger 以生成接口文档.
    def get_core_fields(self, view):
        return getattr(view, 'coreapi_fields', ())


class SwaggerSchemaView(APIView):
    _ignore_model_permissions = True
    exclude_from_schema = True

    #permission_classes = [AllowAny]
    # 此处涉及最终展示页面权限问题，如果不需要认证，则使用AllowAny，这里需要权限认证，因此使用IsAuthenticated
    permission_classes = [IsAuthenticated]
    # from rest_framework.renderers import *
    renderer_classes = [
        CoreJSONRenderer,
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer
    ]

    def get(self, request):
        # 此处的titile和description属性是最终页面最上端展示的标题和描述
        generator = MySchemaGenerator(title='API说明文档',description='''接口测试、说明文档''')

        schema = generator.get_schema(request=request)

        # from rest_framework.response import Response
        return Response(schema)


def DocParam(name="default", location="query",required=True, description=None, type="string",
             *args, **kwargs):
    return coreapi.Field(name=name, location=location,
                         required=required, description=description,
                         type=type)