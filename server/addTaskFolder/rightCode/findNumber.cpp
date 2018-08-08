#include <iostream>
#include <fstream>
#include "let.h"
using namespace std;

int main() {
	//ifstream in("input.txt");
	//ofstream out("output.txt");
	int num = 1000506, n = 8, k = let(num);
	//in >> num >> n;

	if(k < n) cout << -1;
	else {
		cout << (num % (int)(pow(10, k - n + 1)) - num % (int)(pow(10, k - n))) / (int)(pow(10, k - n));
	}


	system("pause");
	return 0;
}