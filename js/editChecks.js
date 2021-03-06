function processForm() {
  resetErrorCounter();
  checkZip();
  checkFacility();
  checkCity();
  getZipRadius();
  clearSearchParemetersDisplay();
  displayParameters();
  callPHPScript();
}

//records any unspecified field as an error. Three errors triggers an error.
function errorCounter() {
  errorCount ++;
  if (errorCount == 3) {
    displayErrors();
  }
}

//resets the error counter
function resetErrorCounter() {
  errorCount = 0;
  if (errorCount < 3) {
    resetStyles();
  }
}

function checkZip() {
  var submittedZipValue = document.getElementById("zipcode").value;
  invalidZip = 0;

  if (submittedZipValue) {
    //Remove this comment and the immediately following line for the minified version.
    console.log("Submitted zip: " + submittedZipValue);
    var checkForLeadingSeven = submittedZipValue.slice(0,1);

      if (checkForLeadingSeven == 7) {
        //Remove this comment and the immediately following line for the minified version.
        console.log("Leading zip digit: " + checkForLeadingSeven);
        checkLastFour = submittedZipValue.slice(1,5);
        //Remove this comment and the immediately following line for the minified version.
        console.log("Last four digits: " + checkLastFour);
        var validTexasCheck = lastFourCheck(checkLastFour);
        //Remove this comment and the immediately following line for the minified version.
        console.log("Texas Validity Boolean: " + validTexasCheck);
        
          if (validTexasCheck == '1') {
              //Remove this comment and the immediately following line for the minified version.
              zipFeedback = "Last four digits are valid.";
              zipForParameterDisplay = submittedZipValue;
          } else {
              throwZipError();
          } //if
      } else {
        //Remove this comment and the immediately following line for the minified version.
        var zipFeedback = "Zip doesn't begin with a 7.";
        throwZipError();
      } //if
  } else {
    //Remove this comment and the immediately following line for the minified version.        
    var zipFeedback = "No ZIP entered.";
    zipForParameterDisplay = "0";
    errorCounter();
  }

//makes sure the last four zipcode digits exist in Texas
function lastFourCheck(checkLastFour) {
  texasZipArray = ["5001","5002","5006","5007","5008","5009","5010","5011","5013","5014","5015","5016","5017","5019","5020","5021","5022","5023","5024","5025","5026","5027","5028","5029","5030","5032","5034","5035","5037","5038","5039","5040","5041","5042","5043","5044","5045","5046","5047","5048","5049","5050","5051","5052","5053","5054","5056","5057","5058","5060","5061","5062","5063","5065","5067","5068","5069","5070","5071","5074","5075","5076","5077","5078","5080","5081","5082","5083","5084","5085","5086","5087","5088","5089","5090","5091","5092","5093","5094","5097","5098","5099","5101","5102","5103","5104","5105","5106","5109","5110","5114","5115","5116","5117","5118","5119","5120","5121","5123","5124","5125","5126","5127","5132","5134","5135","5137","5138","5140","5141","5142","5143","5144","5146","5147","5148","5149","5150","5151","5152","5153","5154","5155","5156","5157","5158","5159","5160","5161","5163","5164","5165","5166","5167","5168","5169","5172","5173","5180","5181","5182","5185","5187","5189","5201","5202","5203","5204","5205","5206","5207","5208","5209","5210","5211","5212","5214","5215","5216","5217","5218","5219","5220","5221","5222","5223","5224","5225","5226","5227","5228","5229","5230","5231","5232","5233","5234","5235","5236","5237","5238","5239","5240","5241","5242","5243","5244","5245","5246","5247","5248","5249","5250","5251","5252","5253","5254","5258","5260","5261","5262","5263","5264","5265","5266","5267","5270","5275","5277","5283","5284","5285","5286","5287","5294","5295","5301","5303","5310","5312","5313","5315","5320","5323","5326","5334","5336","5339","5340","5342","5343","5344","5346","5350","5353","5354","5355","5356","5357","5358","5359","5360","5363","5364","5367","5368","5369","5370","5371","5372","5373","5374","5376","5378","5379","5380","5381","5382","5386","5387","5388","5389","5390","5391","5392","5393","5394","5395","5396","5397","5398","5401","5402","5403","5404","5407","5409","5410","5411","5412","5413","5414","5415","5416","5417","5418","5420","5421","5422","5423","5424","5425","5426","5428","5429","5431","5432","5433","5434","5435","5436","5437","5438","5439","5440","5441","5442","5443","5444","5446","5447","5448","5449","5450","5451","5452","5453","5454","5455","5456","5457","5458","5459","5460","5461","5462","5468","5469","5470","5471","5472","5473","5474","5475","5476","5477","5478","5479","5480","5481","5482","5483","5485","5486","5487","5488","5489","5490","5491","5492","5493","5494","5495","5496","5497","5501","5503","5504","5505","5507","5550","5551","5554","5555","5556","5558","5559","5560","5561","5562","5563","5564","5565","5566","5567","5568","5569","5570","5571","5572","5573","5574","5599","5601","5602","5603","5604","5605","5606","5607","5608","5615","5630","5631","5633","5636","5637","5638","5639","5640","5641","5642","5643","5644","5645","5647","5650","5651","5652","5653","5654","5656","5657","5658","5659","5660","5661","5662","5663","5666","5667","5668","5669","5670","5671","5672","5680","5681","5682","5683","5684","5685","5686","5687","5688","5689","5691","5692","5693","5694","5701","5702","5703","5704","5705","5706","5707","5708","5709","5710","5711","5712","5713","5750","5751","5752","5754","5755","5756","5757","5758","5759","5760","5762","5763","5764","5765","5766","5770","5771","5772","5773","5778","5779","5780","5782","5783","5784","5785","5788","5789","5790","5791","5792","5797","5798","5799","5801","5802","5803","5831","5832","5833","5834","5835","5838","5839","5840","5844","5845","5846","5847","5848","5849","5850","5851","5852","5853","5855","5856","5858","5859","5860","5861","5862","5865","5880","5882","5884","5886","5901","5902","5903","5904","5915","5925","5926","5928","5929","5930","5931","5932","5933","5934","5935","5936","5937","5938","5939","5941","5942","5943","5944","5946","5947","5948","5949","5951","5954","5956","5957","5958","5959","5960","5961","5962","5963","5964","5965","5966","5968","5969","5972","5973","5974","5975","5976","5977","5978","5979","5980","5990","6000","6001","6002","6003","6004","6005","6006","6007","6008","6009","6010","6011","6012","6013","6014","6015","6016","6017","6018","6019","6020","6021","6022","6023","6028","6031","6033","6034","6035","6036","6039","6040","6041","6043","6044","6048","6049","6050","6051","6052","6053","6054","6055","6058","6059","6060","6061","6063","6064","6065","6066","6067","6068","6070","6071","6073","6077","6078","6082","6084","6085","6086","6087","6088","6092","6093","6094","6095","6096","6097","6098","6099","6101","6102","6103","6104","6105","6106","6107","6108","6109","6110","6111","6112","6113","6114","6115","6116","6117","6118","6119","6120","6121","6122","6123","6124","6126","6127","6129","6130","6131","6132","6133","6134","6135","6136","6137","6140","6147","6148","6150","6155","6161","6162","6163","6164","6166","6177","6178","6179","6180","6181","6182","6185","6191","6192","6193","6195","6196","6197","6198","6199","6201","6202","6203","6204","6205","6206","6207","6208","6209","6210","6225","6226","6227","6228","6230","6233","6234","6238","6239","6240","6241","6244","6245","6246","6247","6248","6249","6250","6251","6252","6253","6255","6258","6259","6261","6262","6263","6264","6265","6266","6267","6268","6270","6271","6272","6273","6299","6301","6302","6303","6304","6305","6306","6307","6308","6309","6310","6311","6351","6352","6354","6357","6359","6360","6363","6364","6365","6366","6367","6369","6370","6371","6372","6373","6374","6377","6379","6380","6383","6384","6385","6388","6389","6401","6402","6424","6426","6427","6429","6430","6431","6432","6433","6435","6436","6437","6439","6442","6443","6444","6445","6446","6448","6449","6450","6452","6453","6454","6455","6456","6457","6458","6459","6460","6461","6462","6463","6464","6465","6466","6467","6468","6469","6470","6471","6472","6474","6475","6476","6481","6483","6484","6485","6486","6487","6490","6491","6501","6502","6503","6504","6505","6508","6511","6513","6517","6518","6519","6520","6522","6523","6524","6525","6526","6527","6528","6530","6531","6533","6534","6537","6538","6539","6540","6541","6542","6543","6544","6545","6546","6547","6548","6549","6550","6552","6554","6555","6556","6557","6558","6559","6561","6564","6565","6566","6567","6569","6570","6571","6573","6574","6576","6577","6578","6579","6596","6597","6598","6599","6621","6622","6623","6624","6625","6626","6627","6628","6629","6630","6631","6632","6633","6634","6635","6636","6637","6638","6639","6640","6641","6642","6643","6644","6645","6648","6649","6650","6651","6652","6653","6654","6655","6656","6657","6660","6661","6664","6665","6666","6667","6670","6671","6673","6675","6676","6677","6678","6679","6680","6681","6682","6684","6685","6686","6687","6689","6690","6691","6692","6693","6701","6702","6703","6704","6705","6706","6707","6708","6710","6711","6712","6714","6715","6716","6795","6796","6797","6798","6799","6801","6802","6803","6804","6820","6821","6823","6824","6825","6827","6828","6831","6832","6834","6836","6837","6841","6842","6844","6845","6848","6849","6852","6853","6854","6855","6856","6857","6858","6859","6861","6862","6864","6865","6866","6867","6869","6870","6871","6872","6873","6874","6875","6877","6878","6880","6882","6883","6884","6885","6886","6887","6888","6889","6890","6901","6902","6903","6904","6905","6906","6908","6909","6930","6932","6933","6934","6935","6936","6937","6939","6940","6941","6943","6945","6949","6950","6951","6953","6955","6957","6958","7001","7002","7003","7004","7005","7006","7007","7008","7009","7010","7011","7012","7013","7014","7015","7016","7017","7018","7019","7020","7021","7022","7023","7024","7025","7026","7027","7028","7029","7030","7031","7032","7033","7034","7035","7036","7037","7038","7039","7040","7041","7042","7043","7044","7045","7046","7047","7048","7049","7050","7051","7052","7053","7054","7055","7056","7057","7058","7059","7060","7061","7062","7063","7064","7065","7066","7067","7068","7069","7070","7071","7072","7073","7074","7075","7076","7077","7078","7079","7080","7081","7082","7083","7084","7085","7086","7087","7088","7089","7090","7091","7092","7093","7094","7095","7096","7097","7098","7099","7201","7202","7203","7204","7205","7206","7207","7208","7209","7210","7212","7213","7215","7216","7217","7218","7219","7220","7221","7222","7223","7224","7225","7226","7227","7228","7229","7230","7231","7233","7234","7235","7236","7237","7238","7240","7241","7242","7243","7244","7245","7246","7247","7248","7249","7250","7251","7252","7253","7254","7255","7256","7257","7258","7259","7260","7261","7262","7263","7265","7266","7267","7268","7269","7270","7271","7272","7273","7274","7275","7276","7277","7278","7279","7280","7281","7282","7284","7285","7286","7287","7288","7289","7290","7291","7292","7293","7294","7296","7297","7298","7299","7301","7302","7303","7304","7305","7306","7315","7316","7318","7320","7325","7326","7327","7328","7331","7332","7333","7334","7335","7336","7337","7338","7339","7340","7341","7342","7343","7344","7345","7346","7347","7348","7349","7350","7351","7353","7354","7355","7356","7357","7358","7359","7360","7362","7363","7364","7365","7367","7368","7369","7371","7372","7373","7374","7375","7376","7377","7378","7379","7380","7381","7382","7383","7384","7385","7386","7387","7388","7389","7391","7393","7396","7399","7401","7402","7404","7406","7407","7410","7411","7412","7413","7414","7415","7417","7418","7419","7420","7422","7423","7426","7428","7429","7430","7431","7432","7433","7434","7435","7436","7437","7440","7441","7442","7443","7444","7445","7446","7447","7448","7449","7450","7451","7452","7453","7454","7455","7456","7457","7458","7459","7460","7461","7462","7463","7464","7465","7466","7467","7468","7469","7470","7471","7473","7474","7475","7476","7477","7478","7479","7480","7481","7482","7483","7484","7485","7486","7487","7488","7489","7491","7492","7493","7494","7496","7497","7498","7501","7502","7503","7504","7505","7506","7507","7508","7510","7511","7512","7514","7515","7516","7517","7518","7519","7520","7521","7522","7523","7530","7531","7532","7533","7534","7535","7536","7538","7539","7541","7542","7545","7546","7547","7549","7550","7551","7552","7553","7554","7555","7560","7561","7562","7563","7564","7565","7566","7568","7571","7572","7573","7574","7575","7577","7578","7580","7581","7582","7583","7584","7585","7586","7587","7588","7590","7591","7592","7597","7598","7611","7612","7613","7614","7615","7616","7617","7619","7622","7623","7624","7625","7626","7627","7629","7630","7631","7632","7639","7640","7641","7642","7643","7650","7651","7655","7656","7657","7659","7660","7661","7662","7663","7664","7665","7670","7701","7702","7703","7704","7705","7706","7707","7708","7709","7710","7711","7713","7720","7725","7726","7801","7802","7803","7805","7806","7807","7808","7830","7831","7833","7834","7835","7836","7837","7838","7839","7840","7841","7842","7843","7844","7845","7850","7852","7853","7855","7856","7857","7859","7861","7862","7863","7864","7865","7866","7867","7868","7869","7870","7871","7872","7873","7875","7876","7878","7879","7880","7881","7882","7901","7902","7903","7904","7905","7950","7951","7954","7957","7960","7961","7962","7963","7964","7967","7968","7969","7970","7971","7972","7973","7974","7975","7976","7977","7978","7979","7982","7983","7984","7985","7986","7987","7988","7989","7990","7991","7993","7994","7995","8001","8002","8003","8004","8005","8006","8007","8008","8009","8010","8011","8012","8013","8014","8015","8016","8017","8019","8021","8022","8023","8024","8025","8026","8027","8028","8029","8039","8040","8041","8042","8043","8044","8045","8046","8049","8050","8052","8053","8054","8055","8056","8057","8058","8059","8060","8061","8062","8063","8064","8065","8066","8067","8069","8070","8071","8072","8073","8074","8075","8076","8101","8102","8104","8107","8108","8109","8111","8112","8113","8114","8115","8116","8117","8118","8119","8121","8122","8123","8124","8125","8130","8131","8132","8133","8135","8140","8141","8142","8143","8144","8145","8146","8147","8148","8150","8151","8152","8154","8155","8156","8159","8160","8161","8162","8163","8164","8201","8202","8203","8204","8205","8206","8207","8208","8209","8210","8211","8212","8213","8214","8215","8216","8217","8218","8219","8220","8221","8222","8223","8224","8225","8226","8227","8228","8229","8230","8231","8232","8233","8234","8235","8236","8237","8238","8239","8240","8241","8242","8243","8244","8245","8246","8247","8248","8249","8250","8251","8252","8253","8254","8255","8256","8257","8258","8259","8260","8261","8262","8263","8264","8265","8266","8268","8269","8270","8275","8278","8279","8280","8283","8284","8285","8286","8287","8288","8289","8291","8292","8293","8294","8295","8296","8297","8298","8299","8330","8332","8333","8335","8336","8338","8339","8340","8341","8342","8343","8344","8347","8349","8350","8351","8352","8353","8355","8357","8358","8359","8360","8361","8362","8363","8364","8368","8369","8370","8371","8372","8373","8374","8375","8376","8377","8379","8380","8381","8382","8383","8384","8385","8387","8389","8390","8391","8393","8401","8402","8403","8404","8405","8406","8407","8408","8409","8410","8411","8412","8413","8414","8415","8416","8417","8418","8419","8426","8427","8460","8461","8463","8465","8466","8467","8468","8469","8470","8471","8472","8473","8474","8475","8476","8477","8478","8480","8501","8502","8503","8504","8505","8516","8520","8521","8522","8523","8526","8535","8536","8537","8538","8539","8540","8541","8542","8543","8545","8547","8548","8549","8550","8551","8552","8553","8557","8558","8559","8560","8561","8562","8563","8564","8565","8566","8567","8568","8569","8570","8572","8573","8574","8575","8576","8577","8578","8579","8580","8582","8583","8584","8585","8586","8588","8589","8590","8591","8592","8593","8594","8595","8596","8597","8598","8599","8602","8603","8604","8605","8606","8607","8608","8609","8610","8611","8612","8613","8614","8615","8616","8617","8618","8619","8620","8621","8622","8623","8624","8626","8627","8628","8629","8630","8631","8632","8633","8634","8635","8636","8638","8639","8640","8641","8642","8643","8644","8645","8646","8648","8650","8651","8652","8653","8654","8655","8656","8657","8658","8659","8660","8661","8662","8663","8664","8665","8666","8667","8669","8670","8671","8672","8673","8674","8675","8676","8677","8680","8681","8682","8683","8691","8701","8702","8703","8704","8705","8708","8709","8710","8711","8712","8713","8714","8715","8716","8717","8718","8719","8720","8721","8722","8723","8724","8725","8726","8727","8728","8729","8730","8731","8732","8733","8734","8735","8736","8737","8738","8739","8741","8742","8744","8745","8746","8747","8748","8749","8750","8751","8752","8753","8754","8755","8756","8757","8758","8759","8760","8761","8762","8763","8764","8765","8766","8767","8768","8769","8771","8772","8773","8774","8778","8779","8780","8781","8782","8783","8785","8786","8787","8788","8789","8798","8799","8801","8802","8827","8828","8829","8830","8832","8833","8834","8835","8836","8837","8838","8839","8840","8841","8842","8843","8847","8850","8851","8852","8853","8860","8861","8870","8871","8872","8873","8877","8879","8880","8881","8883","8884","8885","8886","8931","8932","8933","8934","8935","8938","8940","8941","8942","8943","8944","8945","8946","8947","8948","8949","8950","8951","8952","8953","8954","8956","8957","8959","8960","8961","8962","8963","8964","9001","9002","9003","9005","9007","9008","9009","9010","9011","9012","9013","9014","9015","9016","9018","9019","9021","9022","9024","9025","9027","9029","9031","9032","9033","9034","9035","9036","9039","9040","9041","9042","9043","9044","9045","9046","9051","9052","9053","9054","9056","9057","9058","9059","9061","9062","9063","9064","9065","9066","9068","9070","9072","9073","9077","9078","9079","9080","9081","9082","9083","9084","9085","9086","9087","9088","9091","9092","9093","9094","9095","9096","9097","9098","9101","9102","9103","9104","9105","9106","9107","9108","9109","9110","9111","9114","9116","9117","9118","9119","9120","9121","9123","9124","9159","9160","9161","9163","9164","9165","9166","9167","9168","9170","9171","9172","9173","9174","9175","9176","9177","9178","9180","9181","9182","9184","9185","9186","9187","9188","9189","9201","9220","9221","9222","9223","9224","9225","9226","9227","9229","9230","9231","9232","9233","9234","9235","9236","9237","9238","9239","9240","9241","9243","9244","9245","9247","9248","9250","9251","9252","9255","9256","9257","9258","9259","9260","9261","9311","9312","9313","9314","9316","9320","9321","9322","9323","9324","9325","9326","9329","9330","9331","9336","9338","9339","9342","9343","9344","9345","9346","9347","9350","9351","9353","9355","9356","9357","9358","9359","9360","9363","9364","9366","9367","9369","9370","9371","9372","9373","9376","9377","9378","9379","9380","9381","9382","9383","9401","9402","9403","9404","9405","9406","9407","9408","9409","9410","9411","9412","9413","9414","9415","9416","9423","9424","9430","9452","9453","9457","9464","9489","9490","9491","9493","9499","9501","9502","9503","9504","9505","9506","9508","9510","9511","9512","9516","9517","9518","9519","9520","9521","9525","9526","9527","9528","9529","9530","9532","9533","9534","9535","9536","9537","9538","9539","9540","9541","9542","9543","9544","9545","9546","9547","9548","9549","9550","9553","9556","9560","9561","9562","9563","9565","9566","9567","9601","9602","9603","9604","9605","9606","9607","9608","9697","9698","9699","9701","9702","9703","9704","9705","9706","9707","9708","9709","9710","9711","9712","9713","9714","9718","9719","9720","9721","9730","9731","9733","9734","9735","9738","9739","9740","9741","9742","9743","9744","9745","9748","9749","9752","9754","9755","9756","9758","9759","9760","9761","9762","9763","9764","9765","9766","9767","9768","9769","9770","9772","9776","9777","9778","9779","9780","9781","9782","9783","9785","9786","9788","9789","9821","9830","9831","9832","9834","9835","9836","9837","9838","9839","9842","9843","9845","9846","9847","9848","9849","9850","9851","9852","9853","9854","9855","9901","9902","9903","9904","9905","9906","9907","9908","9910","9911","9912","9913","9914","9915","9916","9917","9918","9920","9922","9923","9924","9925","9926","9927","9928","9929","9930","9931","9932","9934","9935","9936","9937","9938","9940","9941","9942","9943","9944","9945","9946","9947","9948","9949","9950","9951","9952","9953","9954","9955","9958","9960","9961","9966","9968","9973","9974","9975","9976","9977","9978","9980","9982","9983","9984","9985","9986","9987","9988","9989","9990","9991","9992","9993","9994","9995","9996","9997","9998","9999"]; 
  var successfulMatch = 0;
    for (var i = 0; i < texasZipArray.length; i++) {
      if (checkLastFour == texasZipArray[i]) {
        var successfulMatch = 1;
      }
    }
  return successfulMatch;
} //lastFourCheck()

 //tells the app to display an error to the userhg
function throwZipError() {
  document.getElementById('zipcode').className = "zipErrorHighlight";
  document.getElementById('zipErrorWindow').className = "showZipError";
  zipForParameterDisplay = "0";
  invalidZip = 1;
}

//Remove this comment and the entire following IF statement for the minified version.
if (zipFeedback) {
  console.log("ZIP Feedback: " + zipFeedback);
}

} //checkZip()

//checks to see if a facility is selected
function checkFacility() {
  var facilitySelection = document.getElementById("facilityType");
  facilitySelectedValue = facilitySelection.options[facilitySelection.selectedIndex].value;
  facilitySelectedHTML = facilitySelection.options[facilitySelection.selectedIndex].innerHTML;
  if (facilitySelectedValue == "0") {
          //Remove this comment and the immediately following line for the minified version.
          console.log("No facility type was selected.");
          errorCounter();
      } else {
          /* Remove this entire ELSE statement for minification */
          console.log(facilitySelectedHTML);
  }
}

//checks to see if a city is selected
function checkCity() { 
  var citySelection = document.getElementById("city");
  var selectedValuesArray = getCityCount(citySelection);
  if (!selectedValuesArray.length) {
        //Remove this comment and the immediately following line for the minified version.        
        console.log('No city was selected.');
        errorCounter();
      } else {
          /* Remove this entire ELSE statement for minification */
          console.log(selectedValuesArray.length + ' cities were selected.');
  }
}

//loops through to see which and how many cities were selected
function getCityCount(city) {
  var result = []; //sets up an array called "result"
  cityForParameterDisplay = [];
  var options = city || city.options; //gets all options from the select menu field
  //console.log(city.options);
  var option;
  for (var i=0, iLen = options.length; i < iLen; i++) {
  //console(options.length); //counts the number of available options in the select field
    option = options[i]; //keeps count [i] until the loop stops
    if (option.selected) { //decides whether or not an option is selected
      result.push(option.value || option.text); //if an option selected = true, it's placed in the array
    }
    if (option.selected == true) {
        cityForParameterDisplay.push(" " + option.text);
    }
  }
  //Remove this comment and the immediately following line for the minified version.        
  console.log(cityForParameterDisplay);
  return result;
}

//clear previous serach parameter display unless the user submits invalid search form
function clearSearchParemetersDisplay() {
  //Remove this comment and the immediately following line for the minified version.
  console.log("Clear Search invalid zip: " + invalidZip);
  //Remove this comment and the immediately following line for the minified version.
  console.log("Error count: " + errorCount);
  if (errorCount < 3 && invalidZip != 1) {
    var facilityParameterDisplay = (document.getElementById("facilityParameter").innerHTML = "");
    var cityForParameterDisplay = (document.getElementById("cityParameter").innerHTML = "");
    var zipParameterDisplay = (document.getElementById("zipParameter").innerHTML = "");
  } 
}

//displays search parameters back to the user above the search results
function displayParameters() {
  if (errorCount < 3 && invalidZip != 1) {
      var searchHeader = (document.getElementById("searchHeader").innerHTML = "Your search for:");
  }

  if (facilitySelectedValue != 0 && invalidZip != 1) {
      var facilityParameterDisplay = (document.getElementById("facilityParameter").innerHTML = "<li class=\"bullet\">" + facilitySelectedHTML + " facilities</li>");
      //Remove this comment and the immediately following line for the minified version.        
      console.log(facilitySelectedValue);
  } 

  if (cityForParameterDisplay.length != 0 && invalidZip != 1) {
      var list = document.getElementById("cityParameter");
      var li = document.createElement('li');
      li.innerHTML = cityForParameterDisplay;
      list.insertBefore(li, list.firstChild);
  }

  if (zipForParameterDisplay != "0") {
      var zipParameterDisplay = (document.getElementById("zipParameter").innerHTML = "<li class=\"bullet\">All facilities within " + selectedRadiusValue + " mile(s) of the: " + zipForParameterDisplay + " zipcode</li>");
  }
}

//gets user specified zip radius
function getZipRadius() {
  var selectedRadius = document.getElementById("zipRadius");
  selectedRadiusValue = selectedRadius.options[selectedRadius.selectedIndex].value;
  selectedRadiusHTML = selectedRadius.options[selectedRadius.selectedIndex].innerHTML;
  //Remove this comment and the immediately following line for the minified version.        
  console.log("Zip Radius: " + selectedRadiusHTML + " miles");
}

//if three errors or a bad zip, throw an error(s)
function displayErrors() {
  document.getElementById('facilityType').className = "errorHighlight";
  document.getElementById('city').className = "errorHighlight";
  document.getElementById('zipcode').className = "zipErrorHighlight"; 
  document.getElementById('errorWindow').className = "showError";
}

//clears error displays on resubmission
function resetStyles() {
  document.getElementById('facilityType').className = "facility";
  document.getElementById('city').className = "city";
  document.getElementById('zipcode').className = "zip";
  document.getElementById('errorWindow').className = "error";
  document.getElementById('zipErrorWindow').className = "zipError";
}

//determines if user input enough parameters to query the server
function callPHPScript() {
  if (errorCount < 3 && invalidZip != 1) {
    submitXMLhttpRequest();
  } 
}

//submits the user defined serach parameters to the PHP script
function submitXMLhttpRequest() {
    var hr = new XMLHttpRequest();
    var url = "runQuery.php";
    var facilityQuery = facilitySelectedValue;
    var zipForQuery = zipForParameterDisplay;
    var radiusQuery = selectedRadiusValue;
    var cityQuery = cityForParameterDisplay;
    var vars = "facility="+facilityQuery+"&zipcode="+zipForQuery+"&zipradius="+radiusQuery+"&city="+cityQuery;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
      if(hr.readyState == 4 && hr.status == 200) {
        var return_data = hr.responseText;
        document.getElementById("results").innerHTML = return_data;
      }
    }
    hr.send(vars);
}