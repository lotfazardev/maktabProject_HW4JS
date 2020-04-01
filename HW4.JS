//++++++++++++++++++++++++++ the sky is the limit ++++++++++++++++++++++++++//

/* --coded by mohammad hossien lotfazar-- 
    --M. SHOBERI master of this course--    
*/

//------------------------------- libraries -------------------------------//
//the libery that found on the internet as you wish
// from https://stackoverflow.com/questions/35570884/how-to-change-gregorian-date-to-persian-date-in-javascript/53894209
function g2j(gy,gm,gd){
    let g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    let jy=(gy<=1600)?0:979;
    gy-=(gy<=1600)?621:1600;
    let gy2=(gm>2)?(gy+1):gy;
    let days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100))
            +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(parseInt(days/12053));
    days%=12053;
    jy+=4*(parseInt(days/1461));
    days%=1461;
    jy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    let jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
    let jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
}
   
//question 1
function GregorianIntoJalali(stringArg="0001/01/01"){
    const ETF = "۰۱۲۳۴۵۶۷۸۹" ;
    let ans = g2j(...stringArg.split("/").map((elem)=> +elem)).map((elem)=>String(elem).split("").map((subElem) => ETF[+subElem] ).join("")).join("/");
    return ans ;
}

//question 2
function datesObjectDiff(date2 = new Date(), date1 = new Date(0)){
    if(typeof date2 === "string"){
        date2 = new Date(Date.parse(date2))
    }
    if(typeof date1 === "string"){
        date1 = new Date(Date.parse(date1))
    }
    const timeArray = ["year","day","hour","minutes","second"] ;
    const timeLine = [365*86400000,86400000,3600000,60000,1000] ;
    let delta = date2 - date1 , tmp = 0 , ans = {} ;
    for(let i of timeLine){
        tmp = 0 ;
        while(delta / i >= 1){
            delta -= i ;
            tmp++ ;
        }
        ans[timeArray[timeLine.indexOf(i)]] = tmp
    }
    return ans
}

//question 3
function datesObjectDiffExtended(){
    let ans = [] , max = new Date(), min = new Date();
    for(let i = 1 ; i < arguments.length ; i++){
        if(arguments[i-1] > arguments[i]){
            max = arguments[i-1]
            min = arguments[i]
        }else{
            max = arguments[i]
            min = arguments[i-1]
        }
        ans.push(datesObjectDiff(max, min));
    }
    return ans
}

//question 4
function timeZoneConvert(dateObj = new Date(), offsetMinTime = 270){
    dateObj.setMinutes(dateObj.getMinutes() + offsetMinTime)
    return dateObj
}

//question 5
function persianDate(string="2020/03/02"){
    const ETF = "۰۱۲۳۴۵۶۷۸۹" ;
    const mapMonth = {
        1 : "فروردین",
        2 : "اردیبهشت",
        3 : "خرداد",
        4 : "تیر",
        5 : "مرداد",
        6 : "شهریور",
        7 : "مهر",
        8 : "آبان",
        9 : "آذر",
        10 : "دی",
        11 : "بهمن",
        12 : "اسفند",
    }
    const mapDay = {
        0 : "یک شنبه",
        1 : "دوشنبه",
        2 : "سه شنبه",
        3 : "چهارشنبه",
        4 : "پنج شنبه",
        5 : "جمعه",
        6 : "شنبه"
    }
    let englishDate = new Date(...string.split("/").map((elem)=>+elem))
    let date = g2j(...string.split("/").map((elem)=>+elem))
    let nowDay = ( englishDate.getDay() + 4 ) % 7
    return `${mapDay[nowDay]}, ${date[2]} ${mapMonth[date[1]]} ${date[0]}`
}

//question 6
function subsetOfStr (strArg){
    strArg = strArg.split("")
    let tmp = "" , ans = []
    for(let i = 0 ; i < strArg.length ; i++){
        tmp = ""
        for(let j = i ; j < strArg.length ; j++){
            tmp += strArg[j]
            ans.push(tmp)
        }
    }
    return ans
}

//question 7
function objToArr(obj={}){
    let ans = []
    for(let i in obj){
        ans.push([i,obj[i]])
    }
    return ans
}

//question 8
function sortByNumeric(array){
    theKey = "";
    for(let i in array[0]){
        if (typeof array[0][i] === "number"){
            theKey = i
            break
        }
    }
    for(let i = 0 ; i < array.length ; i++){
        for(let j = i + 1 ; j < array.length ; j++){
            if(array[j][theKey] > array[i][theKey]){
                [array[j],array[i]] = [array[i],array[j]]
            }
        }
    }
    return array
}

//question 9
function mapRange(baseRange = [1,100], targetRange = [1,5], num = 70){
    let ratio = (targetRange[1] - targetRange[0] + 1 ) / (baseRange[1] - baseRange[0] + 1 )
    return ((num - baseRange[0] + 1 ) * ratio ) + targetRange[0] - 1
}

//question 10
function add_minutes(date = new Date(), min) {
    date.setMinutes( date.getMinutes() + min)
    return date
}


//test section
// console.log(GregorianIntoJalali("2020/03/02"))
// console.table(datesObjectDiff(new Date(),new Date(0)))
// console.table(datesObjectDiffExtended(new Date(),new Date(0),new Date(138732)))
// console.log(timeZoneConvert())
// console.log(persianDate())
// console.log(subsetOfStr("dog"))
// console.table(objToArr({"hello":"world","this":"is","a":"test"}))
// console.table(sortByNumeric([
//     {"stringprp":"mohammad" , "age" : 18},
//     {"stringprp":"ali" , "age" : 13},
//     {"stringprp":"mehrnosh" , "age" : 25},
//     {"stringprp":"nafiseh" , "age" : 18}
// ]))
// console.log(mapRange())
// console.log(add_minutes(new Date(),30))

