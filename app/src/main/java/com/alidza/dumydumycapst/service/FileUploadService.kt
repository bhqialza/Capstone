package com.alidza.dumydumycapst.service

import com.alidza.dumydumycapst.model.response.AddProductResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface FileUploadService {
    @Multipart
    @POST("/user/uploadproduct")
    suspend fun uploadImage(@Part image: MultipartBody.Part): Call<AddProductResponse>
}
