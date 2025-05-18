cmake_minimum_required(VERSION 3.10) 
project(myappmodule) 
add_library(myappmodule SHARED OnLoad.cpp) 
target_link_libraries(myappmodule log) 
