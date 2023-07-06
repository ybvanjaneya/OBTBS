#include<iostream>
using namespace std;

int main(){
    int A[100],ct=0;

    for(int i=0;i<100;i++){
        A[i]=0;
    }
    for(int i=0;i<100;i++){
        for(int j=i;j<100;j+=(i+1)){
            if(A[j]==0)A[j]==1;
            else A[j]==0;
        }
    }
    for(int i=0;i<100;i++){
        if(A[i]==1)ct++;
    }
    cout<<ct<<endl;


    return 0;
} 