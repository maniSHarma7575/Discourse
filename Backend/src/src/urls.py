from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('account.api.urls', 'account_api')),
    path('api/post/', include('post.api.urls', 'post_api')),
]
