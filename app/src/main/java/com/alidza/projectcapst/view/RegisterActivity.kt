package com.alidza.projectcapst.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.alidza.projectcapst.api.ApiConfig
import com.alidza.projectcapst.api.ApiService
import com.alidza.projectcapst.api.ResponseUser
import com.alidza.projectcapst.databinding.ActivityRegisterBinding
import com.alidza.projectcapst.db.DatabaseHelper
import com.alidza.projectcapst.db.User
import com.alidza.projectcapst.db.ValidationUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private lateinit var db: DatabaseHelper
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvMasuk.setOnClickListener{
            startActivity(Intent(this, LoginActivity::class.java))
        }

        db = DatabaseHelper(this)
        apiService = ApiConfig.instanceRetrofit

        binding.btnDaftar.setOnClickListener{
            registerUser()
        }
    }
    private fun registerUser(){
        val username = binding.textInputNama.text.toString()
        val email = binding.textInputEmail.text.toString()
        val password = binding.textInputPassword.text.toString()

        if (ValidationUtils.isTextNotEmpty(username) &&
            ValidationUtils.isTextNotEmpty(email) &&
            ValidationUtils.isTextNotEmpty(password)
        ) {
            if (ValidationUtils.isValidEmail(email)) {
                // Buat objek User dari input pengguna
                val user = User(username = username, email = email.trim(), password = password)

                // Panggil metode register pada API
                val call: Call<ResponseUser> = apiService.register(user.username, user.email, user.password)

                call.enqueue(object : Callback<ResponseUser> {
                    override fun onResponse(call: Call<ResponseUser>, response: Response<ResponseUser>) {
                        if (response.isSuccessful) {
                            // Tangani respons berhasil
                            val registeredUser: ResponseUser? = response.body()
                            // Lanjutkan dengan tindakan setelah pendaftaran berhasil
                            db.registerUser(user)
                            Toast.makeText(this@RegisterActivity, "User registered!", Toast.LENGTH_LONG).show()
                        } else {
                            // Tangani kesalahan jika respons tidak berhasil
                            Toast.makeText(this@RegisterActivity, "Registration failed", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<ResponseUser>, t: Throwable) {
                        // Tangani kegagalan jaringan atau permintaan
                        Toast.makeText(this@RegisterActivity, "Network error", Toast.LENGTH_SHORT).show()
                    }
                })
            } else {
                Toast.makeText(this, "Invalid email format", Toast.LENGTH_SHORT).show()
            }
        } else {

        }
    }
}