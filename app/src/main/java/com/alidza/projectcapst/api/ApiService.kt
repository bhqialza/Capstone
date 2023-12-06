package com.alidza.projectcapst.api

import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface ApiService {
    @FormUrlEncoded
    @POST("/user/login")
    fun login(
        @Field("email") email: String,
        @Field("password") password: String
    ): Call<ResponseUser>

    @FormUrlEncoded
    @POST("/user/register")
    fun register(
        @Field("username") username: String,
        @Field("email") email: String,
        @Field("password") password: String
    ): Call<ResponseUser>

    @GET("/user/getusers")
    fun getUserInfo(
        @Query("userId") userId: String
    ): Call<ResponseUser>
}