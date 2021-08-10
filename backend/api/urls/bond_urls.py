from django.urls import path
from api.views import bond_views as views

urlpatterns = [
    path('sell/', views.BondsToSellList.as_view(), name='bonds_sell_list'),
    path('buy/', views.BondsToBuyList.as_view(), name='bonds_buy_list'),
    path('buy/<uuid:pk>/', views.BondBuyUpdate.as_view(), name='bond_buy'),
    path('create/', views.BondCreate.as_view(), name='bonds_create'),
    path('dollar/', views.BondDollarValue.as_view(), name='bonds_dollar_value')
]