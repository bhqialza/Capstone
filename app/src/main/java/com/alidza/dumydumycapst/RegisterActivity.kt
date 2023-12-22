package com.alidza.dumydumycapst

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.alidza.dumydumycapst.databinding.ActivityRegisterBinding
import com.alidza.dumydumycapst.model.request.RegisterRequest
import com.alidza.dumydumycapst.service.ApiClient
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity(){

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        val root = binding.root
        setContentView(root)
        initData()
    }

    private fun initData(){
        clickListener()
    }

    private fun clickListener(){
        binding.tvMasuk.setOnClickListener {
            moveToLogin()
        }

        binding.btnRegis.setOnClickListener {
            getInputs()
        }
    }

    private fun getInputs(){
        val username = binding.textInputUsername.text.toString()
        val email = binding.textInputEmail.text.toString()
        val password = binding.textInputPassword.text.toString()
        val confirmPassword = binding.textInputConfirmPassword.text.toString()

        if (username.isNotEmpty() && email.isNotEmpty() && password.isNotEmpty() && confirmPassword.isNotEmpty()){
            if (password == confirmPassword){
                registerUser(username, email, password, confirmPassword)
            } else{
                showMessage("Kata sandi tidak sesuai")
            }
        } else {
            showMessage("Semua input dibutuhkan ..")
        }
    }

    private fun registerUser(username: String, email: String, password: String, confirmPassword: String) {
        lifecycleScope.launch {
            try {
                val registerRequest = RegisterRequest(username, email, password, confirmPassword)
                val response = ApiClient.apiService.doRegister(registerRequest)

                if (response.isSuccessful) {
                    moveToLogin()
                } else {
                    val errorBody = response.errorBody()?.string()
                    showMessage("Tidak dapat mendaftar. Error: $errorBody")
                }
            } catch (e: Exception) {
                showMessage("Terjadi kesalahan: ${e.message}")
            }
        }
    }

    private fun showMessage(message: String){
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun moveToLogin(){
        startActivity(Intent(this, LoginActivity::class.java))
    }
}
