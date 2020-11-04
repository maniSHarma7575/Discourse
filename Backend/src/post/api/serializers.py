from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username_from_author')
    user_id = serializers.SerializerMethodField('get_id_from_author')

    class Meta:
        model = Post
        fields = ['title', 'body', 'image', 'slug',
                  'date_updated', 'username', 'user_id']

    def get_username_from_author(self, post_post):
        username = post_post.author.username
        return username

    def get_id_from_author(self, post_post):
        user_id = post_post.author.id
        return user_id
