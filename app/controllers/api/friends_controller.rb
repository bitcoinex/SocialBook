class Api::FriendsController < ApplicationController
  def index
    @friend_requests = @current_user.requestee
  end

  def create
    friend = User.find(params[:friend])
    @pending_friend = Friend.new(
      friender_id: current_user.id,
      friendee_id: friend.id
    )

    if @pending_friend.save
      render json: @pending_friend
    else
      render json: @pending_friend.errors.messages
    end
  end

  def edit

  end

  def show
    @pending_friend = Friend.find(params[:id])
  end

  def update

  end

  def destroy
    friend = User.find(params[:id])
    @cancel_friendship = Friend.find_by(
      friender_id: current_user.id,
      friendee_id: friend.id
    )

    @cancel_friendship.destroy!

    render json: @cancel_friendship
  end

  private

  def friend_params
    params.require(:friend).permit(:status)
  end
end
