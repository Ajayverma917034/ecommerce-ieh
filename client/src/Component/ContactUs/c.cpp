#include<bits/stdc++.h>
using namespace std;
int main(){
    priority_queue<int, vector<int>, greater<int> > pq;
    vector<int> arr{0, 5, 9, 1, 3, 10, 8, 6,11};
    for(auto i : arr)
        pq.push(i);
    while(!pq.empty()){
        cout<<pq.top()<< ' ';
        pq.pop();
    }
    return 0;
}