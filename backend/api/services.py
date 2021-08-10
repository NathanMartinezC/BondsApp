import requests

def get_dollar_value():
    series = 'SF43718'
    headers = {
        "Accept": "application/json",
        "Bmx-Token": "97458884312a311b6968aebcef4ab47e4a4071073be63dc9533835c6885ae9e1"
    } 
    
    url = f'https://www.banxico.org.mx/SieAPIRest/service/v1/series/{series}/datos/oportuno'
    response = requests.get(url, headers=headers)
    json_response = response.json()
    data = json_response['bmx']['series'][0]['datos'][0]
    return data

    # exec(open('api/services.py').read())