package com.alidza.dumydumycapst.dashboard


//class DetailFragment : Fragment() {
//
//    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
//        super.onViewCreated(view, savedInstanceState)
//
//        // Mendapatkan argument "status" dari bundle
//        val status = arguments?.getString("status")
//
//        // Mengatur hasil konversi ke TextView pada DetailFragment
//        val tvKerajinan: TextView = view.findViewById(R.id.tv_kerajinan)
//        tvKerajinan.text = status
//
//        // ... Tambahan logika tampilan lainnya ...
//    }
//    private fun uploadFile(file: File, imageBody: MultipartBody.Part, viewModelScope: Any) {
//        // ... Logika upload file ...
//
//        viewModelScope.let {
//            try {
//                //val response: Response<AddProductResponse> = FileUploadService.uploadImage(imageBody)
//                val response: Response<AddProductResponse> = FileUploadService.uploadImage(imageBody)
//                if (response.isSuccessful) {
//                    val uploadResponse = response.body()
//                    val status = uploadResponse?.status ?: "No Status"
//
//                    // Navigasi ke DetailFragment dengan membawa hasil konversi
//                    navigateToDetailPage(status.toString())
//                } else {
//                    // Handle error
//                    showToast("Upload failed: ${response.errorBody()?.string()}")
//                }
//            } catch (e: Exception) {
//                // Handle exception
//                showToast("Upload failed: ${e.message}")
//            }
//        }
//    }
//
//    private fun showToast(s: String) {}
//
//    private fun navigateToDetailPage(status: String) {
//        val bundle = bundleOf("status" to status)
//        findNavController().navigate(R.id.action_detailFragment_to_uploadFragment, bundle)
//    }
//
//}

