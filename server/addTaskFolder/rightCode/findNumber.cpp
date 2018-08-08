#include <iostream>
#include <fstream>
#include "let.h"
using namespace std;

int main() {
	ifstream in("input.txt");
	ofstream out("output.txt");
	int num, n; 
	in >> num >> n;
        int k = let(num);
	if(k < n) out << -1;
	else {
		out << (num % (int)(pow(10, k - n + 1)) - num % (int)(pow(10, k - n))) / (int)(pow(10, k - n));
	}
        return 0;
}
