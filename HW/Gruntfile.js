module.exports = function(grunt){
grunt.initConfig({
	exec: 
	{
		
		start:
		{
			cmd:'cd ~'
		},
		echo_empty_bucket:
		{
			cmd:"echo 'Deleting Bucket' "
		},	
		delet_Bucket:
		{
			command:'aws s3 rb s3://'+global.Bucket_Name+' --force'
		},
		echo_mk_dir:
		{
			cmd:'mkdir ProjectTest || true'
		},
		mk_dir:
		{
			cmd:'cd ProjectTest'
		},
		echo_angular:
		{
			command:"echo 'Setting up bucket' "
		},
		angular:
		{	
			cmd:'yo angular '+global.Name+' -y'
		},
		serve:
		{
			cmd:'grunt serve'
		},
		build:
		{
			cmd:'grunt build'
		},
		mov_scrips:
		{
			cmd: 'cd dist/scrips'
		},
		create_bucket:
		{
			cmd:'aws s3api create-bucket —bucket-name ['+global.Bucket_Name+']'	
		},
		mv_back:
		{
			cmd:'cd ..'
		},
		sync:
		{
			cmd:'aws s3 sync . s3://'+global.Bucket_Name
		},
		make_public:
		{
			cmd:'aws s3 sync . s3://'+global.Bucket_Name+' —all public-read'
		},
		mk_publci:
		{
			cmd2:'aws s3api put-bucket-website —bucket '+global.Bucket_Name+' —website-configuration'
		},
		launch:
		{
			cmd:'open http://'+global.Bucket_Name+'.s3-website-us-east-1.amazonaws.com/#!/'
		}
	}
});

grunt.registerTask('start',function(Name,Bucket_Name){
	if (Name==null){
		console.log("Error, syntaxis should be 'grunt start:Name:Bucket_Name'");
	}
	else{
		global.Name=Name;
		global.Bucket_Name=Bucket_Name;
		grunt.task.run('exec:');
	};
});
grunt.loadNpmTasks('grunt-exec');

};