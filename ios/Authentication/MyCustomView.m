//
//  MyCustomView.m
//  Authentication
//
//  Created by Jordan Winkelman on 12/5/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "MyCustomView.h"

@implementation MyCustomView {
	UIColor *squareColor;
}

- (void)setIsRed:(BOOL)isRed
{
	squareColor = (isRed) ? [UIColor redColor] : [UIColor greenColor];
	[self setNeedsDisplay];
}

- (void)drawRect:(CGRect)rect
{
	[squareColor setFill];
	CGContextFillRect(UIGraphicsGetCurrentContext(), rect);
}

@end
