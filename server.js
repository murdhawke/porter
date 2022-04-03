const Express  =  require("express");
const Mysql  =  require("mysql");
const Fs  =  require("fs");
const ReadLine  =  require("readline");
const schedule =  require("node-schedule");    


const app = Express();
const port =  4000;



app.listen(port,()=>{
    console.log("Server is running...")
  const job = schedule.scheduleJob('5 21 * * *', function(){
       
       // (B) CONNECT TO DATABASE - CHANGE SETTINGS TO YOUR OWN!
        const db = Mysql.createConnection({
            host: "localhost",
            user: "amos",
            password: "amos1023",
            database: "gupload"
        });
        
        // (C) IMPORT CSV
        // (C1) CREATE FILE STREAM + SQL QUERY
        const reader = ReadLine.createInterface({
            input: Fs.createReadStream("cart.csv")
        }),
        query = "INSERT INTO `cart` (id,user,batch_id,order_platform,outlet_Id,total_cart_items,fruit_salad_count,veggie_salad_count,meal_count,drinks_count,total_cost,delivery_cost,cutlery_cost,discount_amount,discount_code,overall_cost,corporate_amount,cutlery_included,payment_status,order_status,delivery_status,kune_order_id,pos_order_id,pickup,city,zone,first_order,status,channel,txncd,msisdn_id,msisdn_idnum,tracking_id,rider_name,delivery_order_status,rider_phone_number,rider_unique_id,p1,p2,p3,p4,uyt,agt,qwh,ifd,afd,poi,ipay_id,ivm,mc,pos_api_response,status2,message,data,previous,next,pos_delivery_response,livetracking,order_id,response,delivery_note,live_tracking_url,order_closed,pos_push_attempt,createdAt,updatedAt) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        
        // (C2) IMPORT ROW-BY-ROW
        reader.on("line", (row) => {
            row = row.split(",");
            db.query(query, row, (err, results, fields) => {
            if (err) { return console.error(err.message); }
            console.log("USER ID:" + results.insertId);
            });
        });
        
        // (D) CLOSE DATABASE CONNECTION
        reader.on("close", () => {
            db.end();
        });
        
       console.log("It works!!");
    })

})
