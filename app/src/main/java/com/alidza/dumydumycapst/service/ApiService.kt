package com.alidza.dumydumycapst.service

import com.alidza.dumydumycapst.model.request.LoginRequest
import com.alidza.dumydumycapst.model.request.RegisterRequest
import com.alidza.dumydumycapst.model.response.LoginResponse
import com.alidza.dumydumycapst.model.response.RegisterResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {
    @POST("/user/login")
    suspend fun doLogin(@Body loginRequest: LoginRequest): Response<LoginResponse>

    @POST("/user/register")
    suspend fun doRegister(@Body registerRequest: RegisterRequest): Response<RegisterResponse>

    @GET("/user/login")
    suspend fun getDataWithToken(@Header("Authorization") authToken: String): Response<LoginResponse>


//    @GET("/user/profile")
//    suspend fun getProfile()
}