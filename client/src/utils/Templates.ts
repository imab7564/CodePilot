const design = `/*─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                       ✈️  Welcome to CodePilot  ✈️                            │
│                                                                              │
│  Navigate your coding journey with precision and purpose.                   │
│  This cockpit is yours — write, test, and launch your ideas freely.         │
│                                                                              │
│  🧠 Plan smart. 💻 Code sharp. 🛫 Watch it take off.                          │
│                                                                              │
│  Clear skies and happy coding!                                              │
└─────────────────────────────────────────────────────────────────────────────*/
`;

const Templates = (lang: string): string => {
  if (lang === 'cpp') {
    return (
`${design}

#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Welcome to CodePilot!\\nStart your journey here." << endl;
    return 0;
}
`);
  } else if (lang === 'c') {
    return (
`${design}

#include <stdio.h>

int main() {
    printf("Welcome to CodePilot!\\nStart your journey here.\\n");
    return 0;
}
`);
  } else if (lang === 'java') {
    return (
`${design}

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to CodePilot!\\nStart your journey here.");
    }
}
`);
  } else if (lang === 'python') {
    return (
`"""
${design}
"""

print("Welcome to CodePilot!\\nStart your journey here.")
`);
  }

  return "Welcome to CodePilot!\nStart your journey here.";
};

export default Templates;
