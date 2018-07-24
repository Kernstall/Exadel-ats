# ATS

ATS - Automated Testing System. It is designed to automate studies.

## Roles

There are three roles:

* Administrator

* Teacher

* Student

## Work description

Teachers can make questions, tasks, edit them, create tests and verify tests.

Administrator appoints teachers and have the same rights as the teacher.

Students can pass tests, solve tasks, and view their story.

# Our team

* [Alexander](https://vk.com/id81155011) - Skype *sasha-gas*
* Raman - Skype *xjordvard*
* Daniel - Skype *slayerdog4_1*
* Volha - Skype *volha.vetrava*
* Димончик - Skype *passatcc2242*
* Максим - Skype *maksim_pryshchep*
* Яна - Skype *jana.ru.sidorova*

# RUNING DATABASE

1) Downloading mongodb from official site:
	https://www.mongodb.com/download-center?jmp=homepage#community
	There we choose community version variant of installation.
2) After installation we go to the mongodb home directory. Default path:
	C:\ProgramFiles\mongodb\bin
3) Then we run mongod.exe with the help of cmd.
	* There might be a problem with running the db because of lack of default data storage directory.
	* There are 2 options you may use in order to solve this issue:
	* a) Make the default data storage directory. It should look like this:
		C:\data\db
	* b) Choose whatever directory you want, just run the mongod.exe in the following way:
		mongod.exe --dbpath <Path to your directory>
4) If everything went correct, your server should be working fine. Now you can run your main application. In
	order to turn off the server press ctrl + c combination.
5) By default your data base will be empty without any collections. In order to work with data collections
	you should import json files, that are located in Exadel-ats\server\database_json\.
6) Copy these json files into the mongodb directory, that we spoke about earlier. Then open one more cmd and type next command:
	* mongoimport.exe --db TestingSystem --collection collectionName collectionName.json
	* When typing this command consider that the name of collection should be the same as file's name.
	* Example:
	* mongoimport.exe --db TestingSystem --collection groups groups.json
