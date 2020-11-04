from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username_from_author')

    class Meta:
        model = Post
        fields = ['title', 'body', 'image', 'date_updated', 'username']

    def get_username_from_author(self, post_post):
        username = post_post.author.username
        return username
