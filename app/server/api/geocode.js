const axios = require('axios');

class AdresToGeoCode{
    constructor(){
        this.baseURL = "https://geocode-maps.yandex.ru/1.x/";
        this.axiosAdresGeo = axios.create({
            baseURL: this.baseURL,
            params: {
                apikey: API_KEY_you_get_from_Yandex_Geo,
                format: "json",
                lang: "en-US"

            }
        })
    }

    async getGeoCode(fullAdress){
        try{
            return await this.axiosAdresGeo.get('?geocode=' + fullAdress).then((res) => res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos);
        } catch (err){
            console.log(err);
        }
    }

}

module.exports = AdresToGeoCode;