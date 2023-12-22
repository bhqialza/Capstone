package com.alidza.dumydumycapst.model.request

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    val confirmPassword: String
)
