package com.alidza.dumydumycapst

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.alidza.dumydumycapst.databinding.ActivityLoginBinding
import com.alidza.dumydumycapst.model.PreferenceManager
import com.alidza.dumydumycapst.model.PreferenceManager.getAuthToken
import com.alidza.dumydumycapst.model.request.LoginRequest
import com.alidza.dumydumycapst.service.ApiClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private var authToken: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        val root = binding.root
        setContentView(root)

        binding.btnLogin.setOnClickListener {
            val email = binding.textInputEmail.text.toString()
            val password = binding.textInputPassword.text.toString()
            CoroutineScope(Dispatchers.Main).launch {
                loginUser(email, password)
            }
        }

        binding.tvDaftar.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
        }

        retrieveAuthTokenIfAvailable()
    }

    private suspend fun loginUser(email: String, password: String) {
        try {
            val loginRequest = LoginRequest(email, password)
            val response = ApiClient.apiService.doLogin(loginRequest)

            when {
                response.isSuccessful -> {
                    val loginResponse = response.body()
                    authToken = loginResponse?.token

                    if (authToken != null) {
                        PreferenceManager.saveAuthToken(this@LoginActivity, authToken!!)
                        fetchDataUsingToken(authToken!!)
                    }
                }
                else -> {
                    val errorBody = response.errorBody()?.string()
                    Log.e("LoginActivity", "Error response: $errorBody")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("LoginActivity", "Error during execution: ${e.message}")
        }
    }

    private fun fetchDataUsingToken(authToken: String) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val authtoken = ApiClient.apiService.getDataWithToken(authToken)
                startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                finish()
            } catch (e: Exception) {
                Log.e("LoginActivity", "Error during execution: ${e.message}")
            }
        }
    }

    private fun retrieveAuthTokenIfAvailable() {
        authToken = getAuthToken(this)
        if (authToken != null) {
            startActivity(Intent(this, DashboardActivity::class.java))
            finish()
        }
    }
}
