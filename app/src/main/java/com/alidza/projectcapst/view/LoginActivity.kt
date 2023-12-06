package com.alidza.projectcapst.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.alidza.projectcapst.api.ApiConfig
import com.alidza.projectcapst.api.ApiService
import com.alidza.projectcapst.api.ResponseUser
import com.alidza.projectcapst.databinding.ActivityLoginBinding
import com.alidza.projectcapst.db.DatabaseHelper
import com.alidza.projectcapst.db.ValidationUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var db: DatabaseHelper
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        db = DatabaseHelper(this)
        apiService = ApiConfig.instanceRetrofit

        binding.tvDaftar.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        binding.btnMasuk.setOnClickListener {
            loginUser()
        }
    }

    private fun loginUser() {
        val email = binding.textInputEmail.text.toString().trim()
        val password = binding.textInputPassword.text.toString().trim()

        if (ValidationUtils.isTextNotEmpty(email) && ValidationUtils.isTextNotEmpty(password)) {
            if (ValidationUtils.isValidEmail(email)) {
                // Panggil API login di sini
                apiService.login(email, password).enqueue(object : Callback<ResponseUser> {
                    override fun onResponse(call: Call<ResponseUser>, response: Response<ResponseUser>) {
                        if (response.isSuccessful) {
                            // Tanggapi respons sukses di sini
                            val userResponse = response.body()
                            // Lanjutkan dengan tindakan setelah login sukses
                            Toast.makeText(this@LoginActivity, "You are logged", Toast.LENGTH_SHORT).show()
                        } else {
                            // Tanggapi respons gagal di sini
                            // Mungkin menampilkan pesan kesalahan kepada pengguna
                            Toast.makeText(this@LoginActivity, "Login failed", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<ResponseUser>, t: Throwable) {
                        // Tanggapi kesalahan di sini
                        // Mungkin menampilkan pesan kesalahan kepada pengguna
                        Toast.makeText(this@LoginActivity, "API call failed: ${t.message}", Toast.LENGTH_SHORT).show()
                    }
                })
            } else {
                Toast.makeText(this, "Invalid email format", Toast.LENGTH_SHORT).show()
            }
        } else {
            Toast.makeText(this, "Please enter all fields", Toast.LENGTH_SHORT).show()
        }
    }
}
