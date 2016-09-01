package com.onegini.handler;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import com.onegini.mobile.android.sdk.handlers.request.OneginiPinAuthenticationRequestHandler;
import com.onegini.mobile.android.sdk.handlers.request.callback.OneginiPinCallback;
import com.onegini.mobile.android.sdk.model.entity.UserProfile;
import com.onegini.util.PluginResultBuilder;

public class PinAuthenticationRequestHandler implements OneginiPinAuthenticationRequestHandler {

  private static PinAuthenticationRequestHandler instance = null;
  private OneginiPinCallback pinCallback = null;
  private CallbackContext checkPinCordovaCallback;
  private CallbackContext authenticationCordovaCallback;

  protected PinAuthenticationRequestHandler() {

  }

  public static PinAuthenticationRequestHandler getInstance() {
    if (instance == null) {
      instance = new PinAuthenticationRequestHandler();
    }

    return instance;
  }

  public OneginiPinCallback getPinCallback() {
    return pinCallback;
  }

  public void setCheckPinCordovaCallback(final CallbackContext checkPinCordovaCallback) {
    this.checkPinCordovaCallback = checkPinCordovaCallback;
  }

  public void setAuthenticationCordovaCallback(final CallbackContext authenticationCordovaCallback) {
    this.authenticationCordovaCallback = authenticationCordovaCallback;
  }

  @Override
  public void startAuthentication(final UserProfile userProfile, final OneginiPinCallback oneginiPinCallback) {
    this.pinCallback = oneginiPinCallback;

    sendAuthenticationResult(new PluginResultBuilder()
        .withError()
        .withErrorDescription("Pin required")
        .build());
  }

  @Override
  public void onNextAuthenticationAttempt(final int failedAttempts, final int maxAttempts) {
    final int remainingAttempts = maxAttempts - failedAttempts;

    sendCheckPinResult(new PluginResultBuilder()
        .withError()
        .withErrorDescription("OneginiPlugin: next authentication attempt")
        .withMaxFailureCount(maxAttempts)
        .withRemainingFailureCount(remainingAttempts)
        .shouldKeepCallback()
        .build());
  }

  @Override
  public void finishAuthentication() {
    pinCallback = null;
    sendCheckPinResult(new PluginResultBuilder()
        .withSuccess()
        .build());
  }

  private void sendCheckPinResult(final PluginResult pluginResult) {
    if (checkPinCordovaCallback != null) {
      checkPinCordovaCallback.sendPluginResult(pluginResult);
    }
  }

  private void sendAuthenticationResult(final PluginResult pluginResult) {
    if (authenticationCordovaCallback != null) {
      authenticationCordovaCallback.sendPluginResult(pluginResult);
    }
  }
}
