package com.alidza.dumydumycapst

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.alidza.dumydumycapst.dashboard.HomeFragment
import com.alidza.dumydumycapst.dashboard.ProfileFragment
import com.alidza.dumydumycapst.dashboard.ScanFragment
import com.alidza.dumydumycapst.databinding.ActivityDashboardBinding
import com.google.android.material.floatingactionbutton.FloatingActionButton

@Suppress("DEPRECATION")
class DashboardActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDashboardBinding
    private var fragmentHome: HomeFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val fragmentProfile = ProfileFragment()
        fragmentHome = HomeFragment()

        binding.bottomNavigationView.setOnNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.myHome -> {
                    switchFragment(fragmentHome!!)
                    true
                }
                R.id.myProfile -> {
                    switchFragment(fragmentProfile)
                    true
                }
                else -> false
            }
        }

        val buttonFab: FloatingActionButton = findViewById(R.id.buttonFab)
        buttonFab.setOnClickListener {
            val scanFragment = ScanFragment()
            switchFragment(scanFragment)
        }
    }

    private fun switchFragment(fragment: Fragment) {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.container, fragment) // Ganti 'R.id.container' dengan ID layout container Anda
            .addToBackStack(null) // Menambahkan ke back stack agar bisa kembali
            .commit()
    }

//    private fun startScanActivity() {
//        val intent = Intent(this, ScanFragment::class.java)
//        startActivity(intent)
//    }

//    private fun startScanFragment() {
//       val navController = findNavController(R.id.nav_graph)
//        navController.navigate(R.id.action_dashboard_to_scanFragment)
//    }
//    private fun startScanFragment() {
//        val action = DashboardFragmentDirections.actionDashboardToScanFragment()
//        findNavController(R.id.nav_host_fragment).navigate(action)
//    }
}