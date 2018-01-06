<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){
		$cek = $this->db->query("select * from login where username = '{$_POST['username']}' and password = md5({$_POST['password']})")->result_array();
		if(count($cek) > 0){
			$data = [
				'ErrorId' => 0,
				'Pesan' => "Berhasil Login"
			];
		}else{
			$data = [
				'ErrorId' => 1,
				'Pesan' => "Gagal Login Username / Password Salah"
			];
		}
		echo json_encode($data);
	}

	public function register(){
		$data = [
			"username" => $_POST['username'],
			"password" => md5($_POST['password'])
		];

		$result = $this->db->insert('login',$data);
		if($result){
			$data = [
				'ErrorId' => 0,
				'Pesan' => "Berhasil Simpan Data",
				'Data' => $data
			];
		}else{
			$data = [
				'ErrorId' => 1,
				'Pesan' => "Gagal Simpan Data"
			];
		}
		echo json_encode($data);
	}

	public function getData($username=""){
		if(empty($username)){
			$cek = $this->db->query("select * from login ")->result_array();	
		}else{
			$cek = $this->db->query("select * from login where username = '{$username}'")->result_array();
		}
		if(count($cek) > 0){
			$data = [
				'ErrorId' => 0,
				'Data' => $cek
			];
		}else{
			$data = [
				'ErrorId' => 1,
				'Data' => null
			];
		}
		echo json_encode($data);
	}

	public function DeleteData($username){

		$cek = $this->db->delete("login",array('username' => $username));
		if($cek){
			$data = [
				'ErrorId' => 0,
				'Pesan' => "Berhasil Di Hapus"
			];
		}else{
			$data = [
				'ErrorId' => 1,
				'Pesan' => "Gagal Di Hapus"
			];
		}
		echo json_encode($data);
	}

}