# app/controllers/api/v1/tokens_controller.rb
class API::V1::TokensController < ApplicationController
  before_action :authenticate_user!

  def verify
    render json: { message: 'Token is valid' }, status: :ok
  end
end