package com.alidza.dumydumycapst.dashboard

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import androidx.fragment.app.Fragment
import com.alidza.dumydumycapst.R
import com.alidza.dumydumycapst.R.layout

@Suppress("DEPRECATION")
class ScanFragment : Fragment() {
    private val pickImageRequestCode = 123

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(layout.fragment_scan, container, false)

        val galleryButton: Button = view.findViewById(R.id.galleryButton)
        galleryButton.setOnClickListener {
            openGallery()
        }
        return view
    }

    private fun openGallery() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, pickImageRequestCode)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == pickImageRequestCode && resultCode == Activity.RESULT_OK) {
            val selectedImageUri: Uri? = data?.data
            if (selectedImageUri != null) {
                val imageView: ImageView = view?.findViewById(R.id.image) ?: return
                imageView.setImageURI(selectedImageUri)
            }
        }
    }
}