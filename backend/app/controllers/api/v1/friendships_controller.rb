class API::V1::FriendshipsController < ApplicationController
  include Authenticable

  respond_to :json
  before_action :verify_jwt_token

  # GET /users/:id/friendships
  def index
    # TOOD
  end

  # POST /users/:id/friendships
  def create
    # TOOD
  end

  private

  def verify_jwt_token
    authenticate_user!
    head :unauthorized unless current_user
  end  
end