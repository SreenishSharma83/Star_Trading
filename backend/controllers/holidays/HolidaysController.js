const axios = require('axios');
const Holidays = require('../../models/Holidays');

const MARKET_HOLIDAYS_URL = 'https://www.nseindia.com/api/holiday-master?type=trading';

module.exports.get_and_save_market_holidays = async (req,res) => {
    try {
        const holidays = await axios.get(MARKET_HOLIDAYS_URL);
        if(holidays.status === 200) {
            
            const holidaysData = await Holidays.find();
            if(holidaysData && holidaysData.length > 0 ) {
                await Holidays.findOneAndUpdate({ _id: holidaysData[0]._id },{
                    tradingHolidays: holidays.data,
                });
            } else {
                const marketHolidays = new Holidays({
                    tradingHolidays: holidays.data,
                });
                await marketHolidays.save();
            }

            return res.status(200).json({
                message: 'Successfully Saved'
            });
        }
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }   
}


module.exports.get_market_holidays = async (req, res) => {
    try {
        const marketHolidays = await Holidays.find();
        if(marketHolidays) {
            return  res.status(200).json({
                tradingHolidays: marketHolidays[0].tradingHolidays
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
            err: err
        });
    }
}
