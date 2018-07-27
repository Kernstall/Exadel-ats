
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.util.Scanner;

public class Process {
	
	static int m, n;
	
	static BigInteger  probs[][];
	
	static short cmp[][];
	
	public static void main(String [] args) throws FileNotFoundException, UnsupportedEncodingException {
		//long startTime = System.nanoTime();
		FileReader sc = new FileReader("input.txt");
		Scanner scan = new Scanner (sc);
		m = scan.nextInt();
		n = scan.nextInt();
		scan.close();
		
		cmp = new short[(1 << m) + 1][(1 << m) + 1];
		
		probs = new BigInteger[n+1][(1 << m) + 1];
		
		for (short i = 0; i < 1 << m; ++i) {
			for (short j = 0; j < 1 << m; ++j) {
				//cmp[i][j] = check(i, j);
				for (int num = 0; num < m - 1; ++num) {
					int mask =  (i) & (1<<(num));
					int mask2 = (i) & (1<<(num+1));
					if (mask == ( (j) & (1<<(num)) ) && mask * 2 == mask2 && mask2 == ( (j) & (1<<(num+1)) ) ) {
						cmp[i][j] = 1;
						break;
					}
				}
			}
		}
		for (int i = 0; i < 1 << m; ++i) {
			probs[1][i] =  BigInteger.ONE;
		}
		
		for (int N = 2; N <= n; ++N) {
			for (int i = 0; i < 1 << m; ++i) {
				BigInteger sum = BigInteger.ZERO;
				for (int j = 0; j < 1 << m; ++j) {
					if(cmp[j][i] != 1) {
						sum = sum.add( probs[N - 1][j]);
					}
				}
				probs[N][i] = sum;
			}
		}
		
		BigInteger ans = BigInteger.ZERO;

		for (int j = 0; j < 1 << m; ++j) {
			ans = ans.add( probs[n][j]);
		}

		PrintWriter writer = new PrintWriter("output.txt");
		writer.write(ans.toString());
		writer.flush();
		//long endTime   = System.nanoTime();
		//long totalTime = endTime - startTime;
		//System.out.println((double)totalTime / 10e8 );
		
	}
}
