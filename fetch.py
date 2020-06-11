import requests, random, string
marker = '<meta name="viewport" content="width=device-width"/><meta charSet="utf-8"/><title>'
markerB = '<meta name="description" content="'
info = []

def getRandom():
	x = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
	return x

def getUsername(url):
	headers = {
		'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
	}
	response = requests.get(url, headers=headers)
	if response.status_code != 404:
		markerA = response.text.find('authorStats') + 30
		markerB = response.text.find('heartCount') - 2
		markerC = response.text.find('uniqueId') + 11
		markerD = response.text.find('userId') - 3
		if markerA != -1 and markerB != -1:
			followers = response.text[markerA:markerB]
		if markerC != -1 and markerD != -1:
			username = response.text[markerC: markerD]
		if username != '' and followers != '':
			if username[0:27].find('<') == -1 and followers[0:9].find('<') == -1:
				print(username[0:27] + ',' + followers[0:9])
				#print('SUCCESS: ' + url)
	if response.status_code == 403:
		print("Rate limited")
		exit()

for i in range(10000):
	username = ''
	followers = ''
	randomString = getRandom()
	randomUrl = 'https://vm.tiktok.com/' + str(randomString) + '/'
	#print('Trying: ' + randomUrl)
	getUsername(randomUrl)