package com.onegini.model;

import com.google.gson.annotations.SerializedName;
import com.onegini.mobile.sdk.android.library.model.OneginiClientConfigModel;


public class ConfigModel implements OneginiClientConfigModel {
    @SerializedName("shouldGetIdToken")
    private boolean shouldGetIdToken;
    @SerializedName("kOGAppIdentifier")
    private String appIdentifier;
    @SerializedName("kOGAppPlatform")
    private String appPlatform;
    @SerializedName("kOGAppScheme")
    private String appScheme;
    @SerializedName("appSecret")
    private String appSecret;
    @SerializedName("kOGAppVersion")
    private String appVersion;
    @SerializedName("kAppBaseURL")
    private String baseUrl;
    @SerializedName("kOGMaxPinFailures")
    private int maxPinFailures;
    @SerializedName("kOGResourceBaseURL")
    private String resourceBaseUrl;
    @SerializedName("kOGShouldConfirmNewPin")
    private boolean shouldConfirmNewPin;
    @SerializedName("kOGShouldDirectlyShowPushMessage")
    private boolean shouldDirectlyShowPushMessage;
    @SerializedName("certificatePinningKeyStore")
    private int certificatePinningKeyStore;
    @SerializedName("keyStoreHash")
    private String keyStoreHash;
    @SerializedName("deviceName")
    private String deviceName;

    @Override
    public String getAppIdentifier() {
        return appIdentifier;
    }

    @Override
    public String getAppPlatform() {
        return appPlatform;
    }

    @Override
    public String getAppScheme() {
        return appScheme;
    }

    @Override
    public String getAppSecret() {
        return appSecret;
    }

    @Override
    public String getAppVersion() {
        return appVersion;
    }

    @Override
    public String getBaseUrl() {
        return baseUrl;
    }

    @Override
    public int getMaxPinFailures() {
        return maxPinFailures;
    }

    @Override
    public String getResourceBaseUrl() {
        return resourceBaseUrl;
    }

    @Override
    public boolean shouldConfirmNewPin() {
        return shouldConfirmNewPin;
    }

    @Override
    public boolean shouldDirectlyShowPushMessage() {
        return shouldDirectlyShowPushMessage;
    }

    @Override
    public int getCertificatePinningKeyStore() {
        return certificatePinningKeyStore;
    }

    @Override
    public String getKeyStoreHash() {
        return keyStoreHash;
    }

    @Override
    public String getDeviceName() {
        return deviceName;
    }

    @Override
    public boolean shouldGetIdToken() {
        return shouldGetIdToken;
    }
}
