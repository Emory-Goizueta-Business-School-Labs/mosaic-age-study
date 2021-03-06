Array.prototype.shuffle = function() {
// Fisher/Yates shuffle alg for picking random
  var i, j, tmp;
  i = this.length;
  while (--i > 0){
    j = Math.floor(Math.random() * (i + 1));
    tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
  return this;
};
var Q = Qualtrics.SurveyEngine;
var initializeImages = function()
	{
		let hasRun = (parseInt(Q.getEmbeddedData("JS_HAS_RUN")) != 0);
		if (hasRun)
		{
			return hasRun;
		}
		else
		{
			makeAndSaveImageList();
			return hasRun;
		}
		
		function makeAndSaveImageList()
		  {
		  	let conditions = ['O', 'M', 'Y', 'OD', 'MD', 'YD'];
		  	let imgList = [];
		  	let maleFaceIndexes = Array(60).fill().map((x,i) => i + 1).shuffle().slice(0,6);
		  	let femaleFaceIndexes = Array(60).fill().map((x,i) => i + 1).shuffle().slice(0,6);
		  	for (let i =0; i < maleFaceIndexes.length; i++)
		  	{
		  		let cond = conditions.shuffle()[0];
		  		let faceId = maleFaceIndexes[i];
		  		imgList.push("WM" + faceId + cond + ".jpg" );
		  	}
		  	for (let i =0; i < femaleFaceIndexes.length; i++)
		  	{
		  		let cond = conditions.shuffle()[0];
		  		let faceId = femaleFaceIndexes[i];
		  		imgList.push("WW" + faceId + cond + ".jpg" );
		  	}
		  	imgList.shuffle();
		  	let imgNum = 1;
			for (const item of imgList)
			{
					console.log("saving IMG_" + imgNum + ": " + item);
					Q.setEmbeddedData("IMG_" + imgNum++, item);
					
			}
			hasRun = true;
			Q.setEmbeddedData("JS_HAS_RUN", 1);
		  }
	};

function getImageUrlByNumber(imgNumber)
{
	return Q.getEmbeddedData("BASE_URL") + Q.getEmbeddedData("IMG_" + imgNumber);
}
