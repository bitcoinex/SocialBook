class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def newsfeed
    @posts = current_user.newsfeed
    render :newsfeed
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :index
    else
      render json: @user.errors.messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :dob, :sex, :password, :image, :cover_image)
  end
end
