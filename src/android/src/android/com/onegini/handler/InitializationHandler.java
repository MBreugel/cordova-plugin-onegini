package com.onegini.handler;

import java.util.Set;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import com.onegini.mobile.sdk.android.handlers.OneginiInitializationHandler;
import com.onegini.mobile.sdk.android.handlers.error.OneginiInitializationError;
import com.onegini.mobile.sdk.android.model.entity.UserProfile;
import com.onegini.util.PluginResultBuilder;

public class InitializationHandler implements OneginiInitializationHandler {

  private final CallbackContext callbackContext;

  public InitializationHandler(final CallbackContext callbackContext) {
    this.callbackContext = callbackContext;
  }

  @Override
  public void onSuccess(final Set<UserProfile> userProfiles) {
    // TODO do we really need to pass the user profiles with the success cb? If so: add to iOS as well
    final PluginResult pluginResult = new PluginResultBuilder()
        .withSuccess()
        .build();

    callbackContext.sendPluginResult(pluginResult);
  }

  @Override
  public void onError(final OneginiInitializationError oneginiInitializationError) {
    final PluginResult pluginResult = new PluginResultBuilder()
        .withError()
        .withErrorType(oneginiInitializationError.getErrorType())
        .withErrorDescription(oneginiInitializationError.getErrorDescription())
        .build();

    callbackContext.sendPluginResult(pluginResult);
  }
}