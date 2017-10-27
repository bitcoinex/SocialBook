class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    @post = Post.new(post_params)
    @post.owner_id = current_user
    if @post.save
      render '/api/users/show'
    else
      render json: @post.errors.messages
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = current_user.posts.find(params[:id])
  end

  def update
    @post = current_user.posts.find(params[:id])
    if @post.update(post_params)
      render :back
    else
      render json: @post.errors.messages
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
  end
end
