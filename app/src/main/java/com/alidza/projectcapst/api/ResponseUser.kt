package com.alidza.projectcapst.api

import com.google.gson.annotations.SerializedName

data class ResponseUser(
    @SerializedName("userId") val userId: Int,
    @SerializedName("username") val username: String,
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String
)
