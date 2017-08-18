package com.onegini.mobile.sdk.cordova.fcm;

import android.content.Context;
import com.google.firebase.FirebaseApp;
import com.google.firebase.iid.FirebaseInstanceId;

public class FcmRegistrationService {

  private final Context context;
  private final FcmStorage storage;

  public FcmRegistrationService(final Context context) {
    this.context = context;
    storage = new FcmStorage(context);
  }

  public String getRegistrationToken() {
    FirebaseApp.initializeApp(context);
    final String fcmRefreshToken = FirebaseInstanceId.getInstance().getToken();

    if (fcmRefreshToken == null || "".equals(fcmRefreshToken)) {
      return null;
    }

    storage.setRegistrationToken(fcmRefreshToken);
    storage.save();
    return fcmRefreshToken;
  }
}