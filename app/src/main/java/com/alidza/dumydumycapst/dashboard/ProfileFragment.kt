package com.alidza.dumydumycapst.dashboard

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import com.alidza.dumydumycapst.LoginActivity
import com.alidza.dumydumycapst.R
import com.alidza.dumydumycapst.model.PreferenceManager

class ProfileFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val btnLogout = view.findViewById<Button>(R.id.btn_logout)

        // Atur listener onclick pada tombol
        btnLogout.setOnClickListener {
            PreferenceManager.clearAuthToken(requireContext()) // Gunakan requireContext()

            startActivity(Intent(requireContext(), LoginActivity::class.java))
            activity?.finish() // Gunakan activity?.finish() untuk menutup aktivitas
        }
    }
}