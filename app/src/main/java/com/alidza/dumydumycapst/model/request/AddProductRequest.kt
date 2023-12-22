package com.alidza.dumydumycapst.model.request

data class AddProductRequest(
    val category: String,
    val name: String,
    val img: String,
    val steps: String
)
