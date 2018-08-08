#include <iostream>
#include <fstream>
#include "let.h"
#include <cmath>
using namespace std;

int main() {
	ifstream in("input.txt");
	ofstream out("output.txt");
	int num, n;
	in >> num >> n;
        int k = let(num);
	out << (num % (int)(pow(10, k - n + 1)) - num % (int)(pow(10, k - n))) / (int)(pow(10, k - n));
	return 0;
}
