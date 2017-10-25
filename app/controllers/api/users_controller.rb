class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    debugger
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    elsif
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :dob, :sex, :password)
  end
end
