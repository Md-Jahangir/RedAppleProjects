let ima = {
  adDisplayContainer: null,
  adsLoader: null,
  adsManager: null,
  callback: null,
  initialized: false,

  init(adTagUrl) {
    if (this.initialized) return;

    const container = document.getElementById('adContainer');
    this.adDisplayContainer = new google.ima.AdDisplayContainer(container);
    this.adDisplayContainer.initialize();

    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
    this.adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      (e) => {
        ima.adsManager = e.getAdsManager();
        ima.adsManager.init(800, 600, google.ima.ViewMode.NORMAL);
        ima.adsManager.start();
      }
    );

    this.adsLoader.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      () => {
        document.getElementById('adContainer').style.display = 'none';
        if (ima.callback) ima.callback(true); // ad watched
      }
    );

    this.adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      (e) => {
        console.warn('Ad Error', e.getError());
        document.getElementById('adContainer').style.display = 'none';
        if (ima.callback) ima.callback(false); // ad failed
      }
    );

    this.initialized = true;
    this.adTagUrl = adTagUrl;
  },

  showRewardedAd(onComplete) {
    ima.callback = onComplete;
    const adContainer = document.getElementById('adContainer');
    adContainer.style.display = 'block';

    const request = new google.ima.AdsRequest();
    request.adTagUrl = ima.adTagUrl;

    request.linearAdSlotWidth = 800;
    request.linearAdSlotHeight = 600;

    ima.adsLoader.requestAds(request);
  }
};
