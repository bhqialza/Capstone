package com.alidza.dumydumycapst.model

import android.content.Context

object PreferenceManager {

    private const val PREF_NAME = "SharedPreferences"
    private const val KEY_AUTH_TOKEN = "authToken"

    fun saveAuthToken(context: Context, authToken: String) {
        val sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString(KEY_AUTH_TOKEN, authToken)
        editor.apply()
    }

    fun getAuthToken(context: Context): String? {
        val sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
    }

    fun clearAuthToken(context: Context) {
        val sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.remove(KEY_AUTH_TOKEN)
        editor.apply()
    }
}