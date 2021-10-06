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



var ImageManager = function()
	{
		let Q = Qualtrics.SurveyEngine;	
		console.log(Q);
	    let orderedImageList = Q.getEmbeddedData("IMG_LIST").split(',');
		let hasRun = (orderedImageList.length > 1);

		function makeImageList()
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
		  	orderedImageList = imgList;

		  	

		  }
		function saveState()
		{
			if (hasRun) 
			{ 
				return; 
			}
			Q.setEmbeddedData("IMG_LIST", orderedImageList.join(','));
			let imgNum = 1;
			for (const item of orderedImageList)
			{
					console.log("saving IMG_" + imgNum);
					Q.setEmbeddedData("IMG_" + imgNum++, item);
					
			}
		}
		
		  
		return {
			init:function()
			{
				if (hasRun)
				{
					return;
				}
				makeImageList();
				saveState();
			},
		  	
			getImageUrlByNumber:function(imgNumber)
			{
				if (! hasRun)
				{
					this.init();
				}
				return "${e://Field/BASE_URL}" + Q.getEmbeddedData("IMG_" + imgNumber);
			}
		  }
	};

function initializeImages(){
	let IM = new ImageManager();
	IM.init();
}
function getImageUrlByNumber(number)
{
	let IM = new ImageManager();
	return IM.getImageUrlByNumber(number);
}
