LOCAL_PATH := $(call my-dir) 
include $(CLEAR_VARS) 
LOCAL_MODULE := myappmodule 
LOCAL_SRC_FILES := OnLoad.cpp 
include $(BUILD_SHARED_LIBRARY) 
